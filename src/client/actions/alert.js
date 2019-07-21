
export const ALERT_POP = 'INIT_TYPE'

export const alert = (body) => {
  return {
    type: ALERT_POP,
    body
  }
}

