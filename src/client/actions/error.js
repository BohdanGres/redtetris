
export const ERROR = 'ERROR';

export const error = (error) => {
  return {
    type: ERROR,
    error
  }
}

