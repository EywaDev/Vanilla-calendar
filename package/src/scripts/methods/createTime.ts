import VanillaCalendar from '@src/vanilla-calendar';
import transformTime24 from '@scripts/helpers/transformTime24';
import changeTime from '@scripts/methods/changeTime';

export const InputTime = (name: string, CSSClass: string, value: string, range: boolean) => (`
	<label class="${CSSClass}">
		<input type="text"
			name="${name}"
			maxlength="2"
			value="${value}"
			${range ? 'disabled' : ''}>
	</label>
`);

export const RangeTime = (name: string, CSSClass: string, min: number, max: number, step: number, value: string) => (`
	<label class="${CSSClass}">
		<input type="range"
			name="${name}"
			min="${min}"
			max="${max}"
			step="${step}"
			value="${value}">
	</label>
`);

const createTime = (self: VanillaCalendar) => {
    const timeEl: HTMLElement | null = self.HTMLElement.querySelector(`.${self.CSSClasses.time}`);
    if (!timeEl) return;

    const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
    const range = self.settings.selection.controlTime === 'range';
    const [minHour, maxHour] = [0, 23];
    const [minMinutes, maxMinutes] = [0, 59];

    if (self.settings.selection.day === 'multiple' || self.settings.selection.day === 'multiple-ranged') {
        timeEl.innerHTML = (`
		<div class="${self.CSSClasses.timeContent}">
			${InputTime('hours', self.CSSClasses.timeHours, self.selectedHours[0], range)}
			${InputTime('minutes', self.CSSClasses.timeMinutes, self.selectedMinutes[0], range)}
			${keepingTime === 12 ? `
			<button type="button" class="${self.CSSClasses.timeKeeping}"
				${range ? 'disabled' : ''}>${self.selectedKeeping}</button>` : ''}
		</div>
		<div class="${self.CSSClasses.timeRanges}">
		</div>
        <div class="${self.CSSClasses.timeContent}">
        ${InputTime('hoursEnd', self.CSSClasses.timeHours, self.selectedHours[1], range)}
        ${InputTime('minutesEnd', self.CSSClasses.timeMinutes, self.selectedMinutes[1], range)}
        ${keepingTime === 12 ? `
        <button type="button" class="${self.CSSClasses.timeKeeping}"
            ${range ? 'disabled' : ''}>${self.selectedKeeping}</button>` : ''}
    </div>
	`);
    } else {
        timeEl.innerHTML = (`
            <div class="${self.CSSClasses.timeContent}">
                ${InputTime('hours', self.CSSClasses.timeHours, self.selectedHours[0], range)}
                ${InputTime('minutes', self.CSSClasses.timeMinutes, self.selectedMinutes[0], range)}
                ${keepingTime === 12 ? `
                <button type="button" class="${self.CSSClasses.timeKeeping}"
                    ${range ? 'disabled' : ''}>${self.selectedKeeping}</button>` : ''}
            </div>
            <div class="${self.CSSClasses.timeRanges}">
            </div>`
        )
    }



    changeTime(self, timeEl, keepingTime);
};

export default createTime;
