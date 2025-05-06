<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import PicoAudio from 'picoaudio';

	// コンポーネントのプロパティ
	export let fileUrl: string;
	export let loop: boolean = false;
	export let hiddenPlayer: boolean = false;
	export let autoPlay: boolean = false;

	// PicoAudioの型定義
	interface PicoAudioEvent {
		startTime: number;
	}

	// 状態管理
	let picoAudio: typeof PicoAudio.prototype;
	let isPlaying = false;
	let isLoaded = false;
	let currentTime = 0;
	let totalTime = 0;
	let volume = 100;
	let userInteracted = false;
	let waitingForInteraction = false;

	// ========== 再生制御関数 ==========

	/**
	 * MIDIファイルを読み込む関数
	 * @param url MIDIファイルのURL
	 */
	async function loadMidiFile(url: string): Promise<void> {
		try {
			const response = await fetch(url);
			const arrayBuffer = await response.arrayBuffer();
			const midiData = picoAudio.parseSMF(arrayBuffer);

			picoAudio.setData(midiData);
			isLoaded = true;
			totalTime = picoAudio.getTime(Number.MAX_SAFE_INTEGER);

			handleAutoPlayIfNeeded();
		} catch (error) {
			console.error('MIDIファイルの読み込みに失敗しました', error);
		}
	}

	/**
	 * 自動再生の処理
	 */
	function handleAutoPlayIfNeeded(): void {
		if (!autoPlay) return;

		if (userInteracted) {
			startPlayback();
		} else {
			waitingForInteraction = true;
		}
	}

	/**
	 * 再生を開始する
	 */
	function startPlayback(): void {
		if (!isLoaded) return;

		picoAudio.play();
		isPlaying = true;
	}

	/**
	 * 再生を一時停止する
	 */
	function pausePlayback(): void {
		if (!isLoaded) return;

		picoAudio.pause();
		isPlaying = false;
	}

	/**
	 * 再生・停止の切り替え
	 */
	function togglePlay(): void {
		if (!isLoaded) return;

		if (isPlaying) {
			pausePlayback();
		} else {
			startPlayback();
		}
	}

	/**
	 * 停止（最初に戻る）
	 */
	function stop(): void {
		if (!isLoaded) return;

		picoAudio.stop();
		picoAudio.initStatus();
		isPlaying = false;
		currentTime = 0;
	}

	// ========== イベントハンドラ ==========

	/**
	 * ユーザーのインタラクションを処理する関数
	 */
	function handleUserInteraction(): void {
		if (userInteracted) return;

		userInteracted = true;

		// 自動再生待ちの場合は再生開始
		if (waitingForInteraction && isLoaded && !isPlaying && autoPlay) {
			startPlayback();
			waitingForInteraction = false;
		}
	}

	/**
	 * 現在の再生位置を更新
	 * @param {Event} event イベントオブジェクト
	 */
	function updateSeekPosition(event: Event): void {
		if (!isLoaded) return;

		const wasPlaying = isPlaying;
		if (isPlaying) {
			pausePlayback();
		}

		const input = event.target as HTMLInputElement;
		const position = parseFloat(input.value);

		picoAudio.stop();
		picoAudio.initStatus();
		picoAudio.setStartTime(position);
		currentTime = position;

		if (wasPlaying) {
			startPlayback();
		}
	}

	/**
	 * 音量を更新
	 */
	function updateVolume(event: Event): void {
		if (!isLoaded) return;

		const input = event.target as HTMLInputElement;
		volume = parseFloat(input.value);
		picoAudio.setMasterVolume(volume / 100); // 0-100の値を0-1に変換
	}

	// ========== ライフサイクルフック ==========

	onMount(async () => {
		// PicoAudioの初期化
		picoAudio = new PicoAudio();
		picoAudio.init();

		// イベントリスナーの設定
		picoAudio.addEventListener('noteOn', () => {});

		// 再生位置の更新
		picoAudio.addEventListener('noteOff', (event: PicoAudioEvent) => {
			if (currentTime < event.startTime) {
				currentTime = event.startTime;
			}
		});

		// 再生終了時の処理
		picoAudio.addEventListener('songEnd', () => {
			stop();
			if (loop) {
				startPlayback();
			}
		});

		// MIDIファイルの読み込み
		await loadMidiFile(fileUrl);

		// グローバルなユーザーインタラクション検出
		setupGlobalInteractionListeners();
	});

	/**
	 * グローバルなユーザーインタラクションリスナーを設定
	 */
	function setupGlobalInteractionListeners(): void {
		const interactionEvents = ['click', 'touchstart', 'keydown', 'mousedown'];

		const handleGlobalInteraction = () => {
			handleUserInteraction();

			// 一度インタラクションが検出されたら、イベントリスナーを削除
			if (userInteracted) {
				interactionEvents.forEach((event) => {
					window.removeEventListener(event, handleGlobalInteraction);
				});
			}
		};

		interactionEvents.forEach((event) => {
			window.addEventListener(event, handleGlobalInteraction);
		});
	}

	onDestroy(() => {
		// 再生停止
		if (picoAudio && isPlaying) {
			picoAudio.stop();
		}
	});
</script>

<div
	class="mx-auto w-full max-w-[200px] rounded-none border border-[#aaa] bg-[#e8e8e8] shadow"
	class:hidden={hiddenPlayer}
>
	{#if isLoaded}
		<div class="p-[1px]">
			<div class="w-[96%] py-[1px]">
				<input
					type="range"
					min="0"
					max={totalTime}
					step="0.1"
					value={currentTime}
					on:input={updateSeekPosition}
					disabled={!isLoaded}
					class="slider-input"
				/>
			</div>

			<div class="flex items-center justify-between p-[1px_4px]">
				<div class="flex gap-[15px]">
					<button
						class="flex h-[16px] w-[12px] cursor-pointer items-center justify-center border-none bg-none p-[1px] text-xs text-[#111] outline-none disabled:cursor-not-allowed disabled:text-[#999]"
						on:click={togglePlay}
						disabled={!isLoaded}
					>
						{#if isPlaying}
							<span class="inline-block text-[10px]">&#10074;&#10074;</span>
						{:else}
							<span class="inline-block text-[10px]">&#9654;</span>
						{/if}
					</button>

					<button
						class="flex h-[16px] w-[12px] cursor-pointer items-center justify-center border-none bg-none p-[1px] text-xs text-[#111] outline-none disabled:cursor-not-allowed disabled:text-[#999]"
						on:click={stop}
						disabled={!isLoaded}
					>
						<span class="inline-block text-[10px]">&#9632;</span>
					</button>
				</div>

				<div class="flex items-center gap-[2px]">
					<span class="text-[10px] text-[#111]">&#128266;</span>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						class="slider-input h-[2px] w-[50px]"
						on:input={updateVolume}
						disabled={!isLoaded}
					/>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.slider-input {
		width: 100%;
		height: 2px;
		background: #c8c8c8;
		outline: none;
		border-radius: 0;
	}

	.slider-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 5px;
		height: 8px;
		background: #333;
		cursor: pointer;
		border-radius: 0;
	}
</style>
