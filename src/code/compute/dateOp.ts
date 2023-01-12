export function isSameDate(d1: Date, d2: Date) {
    return (d1.getDate() == d2.getDate() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getFullYear() == d2.getFullYear())
  }
  
export function isLesserDate(d1: Date, d2: Date) {
    return (d1.getTime() - d2.getTime() < 0 && !isSameDate(d1, d2))
}