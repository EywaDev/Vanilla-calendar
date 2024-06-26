import VanillaCalendar from '@src/vanilla-calendar';

type TypeTime = 'hours' | 'minutes';

const getInputElement = (
    timeEl: HTMLElement,
    className: string,
    name?: string,
) => timeEl.querySelector(`.${className}${name ? ` input[name="${name}"]` : ''}`) as HTMLInputElement;


const setTime = (self: VanillaCalendar, e: any, value: string, type: TypeTime) => {
    if (e.target?.name == 'minutes' || e.target?.name == 'hours') {
        const typeMap = {
            hours: () => { self.selectedHours[0] = value; },
            minutes: () => { self.selectedMinutes[0] = value; },
        };
        typeMap[type]();
        self.selectedTime[0] = `${self.selectedHours[0]}:${self.selectedMinutes[0]}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;
    }
    else if (e.target?.name == 'minutesEnd' || e.target?.name == 'hoursEnd') {
        const typeMap = {
            hours: () => { self.selectedHours[1] = value; },
            minutes: () => { self.selectedMinutes[1] = value; },
        };
        typeMap[type]();
        self.selectedTime[1] = `${self.selectedHours[1]}:${self.selectedMinutes[1]}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;
    }

    if (self.actions.changeTime) self.actions.changeTime(e, self);

    if (self.input && self.HTMLInputElement && self.actions.changeToInput) self.actions.changeToInput(e, self);
};

// not needed for us
// const changeRange = (self: VanillaCalendar, range: HTMLInputElement, input: HTMLInputElement, btnKeepingTime: HTMLButtonElement | null, type: TypeTime, max: number) => {
//     range.addEventListener('input', (e) => {
//         const inputEl = e.target as HTMLInputElement;
//         const value = Number(inputEl.value);
//         const valueStr = value < 10 ? `0${value}` : `${value}`;

//         if (type !== 'hours' || max !== 12) {
//             input.value = valueStr;
//             setTime(self, e, [valueStr], type);
//             return;
//         }

//         if (value < max && value > 0) {
//             input.value = valueStr;
//             self.selectedKeeping = 'AM';
//             (btnKeepingTime as HTMLButtonElement).innerText = self.selectedKeeping;
//             setTime(self, e, [valueStr], type);
//         } else {
//             if (value === 0) {
//                 self.selectedKeeping = 'AM';
//                 (btnKeepingTime as HTMLButtonElement).innerText = 'AM';
//             } else {
//                 self.selectedKeeping = 'PM';
//                 (btnKeepingTime as HTMLButtonElement).innerText = 'PM';
//             }
//             input.value = transformTime12(inputEl.value);
//             setTime(self, e, transformTime12(inputEl.value), type);
//         }
//     });
// };

const changeInput = (self: VanillaCalendar, range: HTMLInputElement, input: HTMLInputElement, btnKeepingTime: HTMLButtonElement | null, type: TypeTime, max: number) => {
    input.addEventListener('change', (e) => {
        const inputEl = e.target as HTMLInputElement;
        const value = Number(inputEl.value);
        const valueStr = value < 10 ? `0${value}` : `${value}`;
        if (inputEl.value && value <= max && value >= 0) {
            inputEl.value = valueStr;
            setTime(self, e, valueStr, type);
        } else if (type === 'hours') {
            inputEl.value = self.selectedHours[0];
        } else if (type === 'minutes') {
            inputEl.value = self.selectedMinutes[0];
        }
    });
};

// const clickBtnKeepingTime = (self: VanillaCalendar, btnKeepingTime: HTMLButtonElement, rangeHours: HTMLInputElement) => {
//     btnKeepingTime.addEventListener('click', (e) => {
//         self.selectedKeeping = btnKeepingTime.innerText.includes('AM') ? 'PM' : 'AM';
//         btnKeepingTime.innerText = self.selectedKeeping;
//         rangeHours.value = transformTime24(self.selectedHours[0], self.selectedKeeping);
//         setTime(self, e, self.selectedHours, 'hours');
//     });
// };

const changeTime = (self: VanillaCalendar, timeEl: HTMLElement, keepingTime: false | 12 | 24) => {
    const maxTime = keepingTime === 24 ? 23 : keepingTime || 12;
    const rangeHours = getInputElement(timeEl, self.CSSClasses.timeRange, 'hours');
    const rangeMinutes = getInputElement(timeEl, self.CSSClasses.timeRange, 'minutes');
    const inputHours = getInputElement(timeEl, self.CSSClasses.timeHours, 'hours');
    const inputMinutes = getInputElement(timeEl, self.CSSClasses.timeMinutes, 'minutes');
    const inputHoursEnd = getInputElement(timeEl, self.CSSClasses.timeHours, 'hoursEnd');
    const inputMinutesEnd = getInputElement(timeEl, self.CSSClasses.timeMinutes, 'minutesEnd');
    const btnKeepingTime: HTMLButtonElement | null = timeEl.querySelector(`.${self.CSSClasses.timeKeeping}`);

    changeInput(self, rangeHours, inputHours, btnKeepingTime, 'hours', maxTime);
    changeInput(self, rangeMinutes, inputMinutes, btnKeepingTime, 'minutes', 59);

    if (self.settings.selection.day === 'multiple' || self.settings.selection.day === 'multiple-ranged') {
        changeInput(self, rangeHours, inputHoursEnd, btnKeepingTime, 'hours', maxTime);
        changeInput(self, rangeMinutes, inputMinutesEnd, btnKeepingTime, 'minutes', 59);
    }
};

export default changeTime;
