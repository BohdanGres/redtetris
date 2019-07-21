
export const ALERT_POP = 'ALERT_POP'

export const alert = (body) => {
  return {
    type: ALERT_POP,
    body
  }
}

