/**
 * マウスストーカーの各アイテムを表現するクラス
 * マウスの軌跡に表示される個々の要素（星マークなど）の状態を管理する
 */
export default class MouseStalkerItem {
  sign: string;
  color: string;
  timer: number;
  x: number;
  y: number;

  /**
   * マウスストーカーアイテムを初期化する
   * @param sign 表示する文字（★など）
   * @param color アイテムの色（RGB形式）
   * @param timer 初期タイマー値（通常は0から開始）
   * @param x 初期X座標位置
   * @param y 初期Y座標位置
   */
	constructor(sign:string, color: string, timer: number, x: number, y: number) {
    this.sign = sign;
		this.color = color;
		this.timer = timer;
		this.x = x;
		this.y = y;
	}
}
