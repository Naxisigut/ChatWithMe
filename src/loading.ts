import type { Ora } from 'ora';
import ora from 'ora';

// let spinner: Ora 

// export const loadingStart = () => {
//   spinner = ora('loading').start()
// } 

// export const loadingStop = () => {
//   spinner.stop()
// }
// let spinner
 
let loading: Ora

export const spinner = {
  start: () => {
    loading = ora('loading').start()
  },
  stop: () => {
    loading.stop()
  } 
}
