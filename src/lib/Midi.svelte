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
	 * @param {Event} event - イベントオブジェクト
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

		picoAudio.addEventListener('noteOff', (event: PicoAudioEvent) => {
			if (currentTime < event.startTime) {
				currentTime = event.startTime;
			}
		});

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

<div class="midi-player" class:hiddenPlayer>
	{#if isLoaded}
		<div class="player-container">
			<div class="progress-bar">
				<input
					type="range"
					min="0"
					max={totalTime}
					step="0.1"
					value={currentTime}
					on:input={updateSeekPosition}
					disabled={!isLoaded}
				/>
			</div>

			<div class="controls-container">
				<div class="playback-controls">
					<button class="control-btn play-btn" on:click={togglePlay} disabled={!isLoaded}>
						{#if isPlaying}
							<span class="pause-icon">&#10074;&#10074;</span>
						{:else}
							<span class="play-icon">&#9654;</span>
						{/if}
					</button>

					<button class="control-btn stop-btn" on:click={stop} disabled={!isLoaded}>
						<span class="stop-icon">&#9632;</span>
					</button>
				</div>

				<div class="volume-control">
					<span class="volume-icon">&#128266;</span>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						class="volume-slider"
						on:input={updateVolume}
						disabled={!isLoaded}
					/>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.midi-player {
		width: 100%;
		max-width: 200px;
		margin: 0 auto;
		border: 1px solid #aaa;
		background-color: #e8e8e8;
		border-radius: 0;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	}

	.player-container {
		padding: 1px;
	}

	.progress-bar {
		width: 96%;
		padding: 1px 0;
	}

	input[type='range'] {
		width: 100%;
		height: 2px;
		background: #c8c8c8;
		outline: none;
		border-radius: 0;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 5px;
		height: 8px;
		background: #333;
		cursor: pointer;
		border-radius: 0;
	}

	.controls-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1px 4px;
	}

	.playback-controls {
		display: flex;
		gap: 15px;
	}

	.control-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 12px;
		padding: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #111;
		outline: none;
		width: 12px;
		height: 16px;
	}

	.control-btn:disabled {
		color: #999;
		cursor: not-allowed;
	}

	.play-icon {
		display: inline-block;
		font-size: 10px;
	}

	.pause-icon {
		display: inline-block;
		font-size: 10px;
	}

	.stop-icon {
		display: inline-block;
		font-size: 10px;
	}

	.volume-control {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.volume-icon {
		font-size: 10px;
		color: #111;
	}

	.volume-slider {
		width: 50px;
		height: 2px;
	}

	.hiddenPlayer {
		display: none !important;
	}
</style>
