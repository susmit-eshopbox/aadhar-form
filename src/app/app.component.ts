import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, fromEvent } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
export type EditorType = boolean;

@Component({
  selector: 'app-root',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showTemplate: EditorType = true;
  isOpen: Boolean = true;
  toggle(): void {
    this.isOpen = !this.isOpen;
  }
  time = new Observable<string>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  show(a: boolean) {
    console.log(this.showTemplate);
    return (this.showTemplate = a);
  }
  // get showProfileEditor() {
  //   return this.editor === 'reactive';
  // }
  // toggleEditor(type: EditorType) {
  //   this.editor = type;
  // }
  ngOnInit(): void {
    localStorage.setItem('data', JSON.stringify(''));
    // Create a new Observable
    const sqnc = new Observable(countOnetoTen);

    // Execute the Observable and print the
    // result of each notification
    // next() is a call to countOnetoTen method
    // to get the next value from the observable
    sqnc.subscribe({
      next(num) {
        console.log(num);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('DOne');
      },
    });

    // This function runs when subscribe()
    // is called
    function countOnetoTen(observer: any) {
      for (var i = 1; i <= 10; i++) {
        // Calls the next observable
        // notification

        if (i === 7) {
          observer.error('oppos val is 7');
        }
        if (i === 8) {
          observer.complete('This is done');
        }
        observer.next(i);
      }

      // Unsubscribe after completing
      // the sequence
      return { unsubscribe() {} };
    }
    ///Multicasting
    function multicastSequenceSubscriber() {
      const seq = [1, 2, 3];
      // Keep track of each observer (one for every active subscription)
      const observers: Observer<unknown>[] = [];
      // Still a single timeoutId because there will only ever be one
      // set of values being generated, multicasted to each subscriber
      let timeoutId: any;

      // Return the subscriber function (runs when subscribe()
      // function is invoked)
      return (observer: Observer<unknown>) => {
        observers.push(observer);
        // When this is the first subscription, start the sequence
        if (observers.length === 1) {
          const multicastObserver: Observer<number> = {
            next(val) {
              // Iterate through observers and notify all subscriptions
              observers.forEach((obs) => obs.next(val));
            },
            error() {
              /* Handle the error... */
            },
            complete() {
              // Notify all complete callbacks
              observers.slice(0).forEach((obs) => obs.complete());
            },
          };
          doSequence(multicastObserver, seq, 0);
        }

        return {
          unsubscribe() {
            // Remove from the observers array so it's no longer notified
            observers.splice(observers.indexOf(observer), 1);
            // If there's no more listeners, do cleanup
            if (observers.length === 0) {
              clearTimeout(timeoutId);
            }
          },
        };

        // Run through an array of numbers, emitting one value
        // per second until it gets to the end of the array.
        function doSequence(
          sequenceObserver: Observer<number>,
          arr: number[],
          idx: number
        ) {
          timeoutId = setTimeout(() => {
            console.log('Emitting ' + arr[idx]);
            sequenceObserver.next(arr[idx]);
            if (idx === arr.length - 1) {
              sequenceObserver.complete();
            } else {
              doSequence(sequenceObserver, arr, ++idx);
            }
          }, 1000);
        }
      };
    }

    // Create a new Observable that will deliver the above sequence
    const multicastSequence = new Observable(multicastSequenceSubscriber());

    // Subscribe starts the clock, and begins to emit after 1 second
    multicastSequence.subscribe({
      next(num) {
        console.log('1st subscribe: ' + num);
      },
      complete() {
        console.log('1st sequence finished.');
      },
    });

    // After 1 1/2 seconds, subscribe again (should "miss" the first value).
    setTimeout(() => {
      multicastSequence.subscribe({
        next(num) {
          console.log('2nd subscribe: ' + num);
        },
        complete() {
          console.log('2nd sequence finished.');
        },
      });
    }, 1500);

    // Logs:
    // (at 1 second): Emitting 1
    // (at 1 second): 1st subscribe: 1
    // (at 2 seconds): Emitting 2
    // (at 2 seconds): 1st subscribe: 2
    // (at 2 seconds): 2nd subscribe: 2
    // (at 3 seconds): Emitting 3
    // (at 3 seconds): 1st subscribe: 3
    // (at 3 seconds): 2nd subscribe: 3
    // (at 3 seconds): 1st sequence finished
    // (at 3 seconds): 2nd sequence finished
  }
}
