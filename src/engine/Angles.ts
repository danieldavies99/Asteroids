
/**
 * if given an angle greater than 2 pi, will return modulus
 * e.g. 3PI returns 1PI
 * 
 * if given an angle less than 0, will return 2PI + angle
 * e.g. -0.5PI because 1.5PI
 *
 * @param   {number}  angle  angle to normalize
 *
 * @return  {number}         normalized angle
 */
export const normalizeAngle = (angle: number): number => {
  if(angle < 0) {
    return (Math.PI * 2) + angle
  }
  if(angle > Math.PI * 2) {
    return angle % Math.PI*2
  }
  return angle
}