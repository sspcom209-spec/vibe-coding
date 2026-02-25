// Tailwind 클래스들을 안전하게 합쳐주는 간단한 유틸 함수입니다.
// falsy 값(null/undefined/false/빈 문자열 등)을 자동으로 제거한 뒤 공백으로 이어 붙입니다.
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

