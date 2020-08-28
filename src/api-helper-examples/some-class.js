import { apiHelper } from 'js-utils-apm';
import { observable } from 'mobx';

export default class SomeClass {
  @observable results = [];
  @observable error = null;
  @observable isLoading = false;

  getDataFromApi() {
    this.isLoading = true;

    return apiHelper
            .get('/some/api')
            .then((results) => {
                this.results = results;
            })
            .catch((e) => {
                this.error = e;
            })
            .finally(() => {
                this.isLoading = false;
            });
  }
}