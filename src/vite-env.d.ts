/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'picoaudio' {
	const PicoAudio: any;
	export default PicoAudio;
}

type NoteEvent = {
	channel: number; // チャンネル(0-15)
	instrument: number; // 楽器の種類(0-127)

	start: number; // 音の始まりのタイミング(tick=SMF時間)
	stop: number; // 音の終わりのタイミング(tick)
	startTime: number; // 音の始まりのタイミング(秒数)
	stopTime: number; // 音の終わりのタイミング(秒数)

	velocity: number; // ベロシティ(0-1)
	pitch: number; // 音の高さ(0-127)

	// CCパラメータ
	pan: CCEvent[];
	pitchBend: CCEvent[];
	expression: CCEvent[];
	modulation: CCEvent[];
	chorus: CCEvent[];
	reberb: CCEvent[];
};

type CCEvent = {
	timing: number; // タイミング(tick)
	time: number; // タイミング(秒数)
	value: number; // 値(0-127)
};
