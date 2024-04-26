// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import '@src/styles/vanilla-calendar.css';

let config: IOptions;


//multiple-range
config = {
    date: {
        min: '2024-04-12',
        max: '2024-06-15',
    },
    type: 'multiple',
    settings: {
        selection: {
            day: 'multiple-ranged',
            time: 24,
        },
        selected: {
            time: ['10:20', '11:45']
        },
        visibility: {
            weekend: false,
            theme: 'light'
        }
    },
    actions: {
        clickDay(event, self) {
            console.log(self.selectedDates);
        },
        changeTime(event, self) {
            console.log(self.selectedTime);
        }
    },
};


//single
config = {
    date: {
        min: '2024-04-12',
        max: '2024-06-15',
    },
    settings: {
        selection: {
            time: 24,
        },
        selected: {
            time: ['10:20']
        },
        visibility: {
            weekend: false,
            theme: 'light'
        }
    },
    actions: {
        clickDay(event, self) {
            console.log(self.selectedDates);
        },
        changeTime(event, self) {
            console.log(self.selectedTime);
        }
    },
};


document.addEventListener('DOMContentLoaded', () => {
    const calendar = new VanillaCalendar('#calendar', config);
    calendar.init();
});
