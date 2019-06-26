
export const ELRT = 'INIT_TYPE'

export const init = (body) => {
  return {
    type: INIT_TYPE,
    body
  }
}

