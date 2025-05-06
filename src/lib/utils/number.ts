/**
 * 指定した桁数でゼロ埋めする関数
 * @param value 数値
 * @param digit 桁数
 * @returns ゼロ埋めされた文字列
 */
export const zeroPad = (value: number, digit: number): string => {
	if (digit < 1) throw new Error('桁数は1以上を指定してください');
	if (value < 0) throw new Error('負の数値は対応していません');

	const zeros = '0'.repeat(digit);
	return (zeros + String(value)).slice(-digit);
};
