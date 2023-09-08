import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo-project';
  item!: string;
  cont: any = [];
  cont2: { text: string; check: boolean }[] = [];
  str!: string;
  check: boolean = false;
  strike!: any;

  line(data: any) {
    console.log(data);
    this.cont2[data].check = !this.cont2[data].check;
    console.log(this.cont2);
  }

  change(data: any) {
    // this.cont.splice(data,1,result.value.login);
    // localStorage.setItem('store', JSON.stringify(this.cont));
    // this.get();

    Swal.fire({
      title: 'New Task to be done',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        //   return fetch(`//api.github.com/users/${login}`)
        //     .then((response) => {
        //       if (!response.ok) {
        //         throw new Error(response.statusText);
        //       }
        //       return response.json();
        //     })
        //     .catch((error) => {
        //       Swal.showValidationMessage(`Request failed: ${error}`);
        //     });

        // },
        if (login) {
          // this.cont2.splice(data, 1, login);
          this.cont2[data].text = login;
          console.log(this.cont2);

          localStorage.setItem('store', JSON.stringify(this.cont2));
          this.get();
        } else {
          Swal.showValidationMessage(`Request failed:`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  add() {
    if (this.item) {
      this.cont2.push({ text: this.item, check: false });
      // this.cont.push(this.item);
      localStorage.setItem('store', JSON.stringify(this.cont2));
      this.item = '';
      this.get();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your task has been added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter the task',
      });
    }
    console.log(this.cont2);
  }

  get() {
    if (localStorage.getItem('store')) {
      this.cont = localStorage.getItem('store');
      this.cont2 = JSON.parse(this.cont);
    } else {
      this.cont2 = [];
    }
  }

  del(data: any) {
    this.cont2.splice(data, 1);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task deleted successfully',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
