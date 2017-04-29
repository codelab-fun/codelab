import {Injectable} from '@angular/core';


@Injectable()
export class PresentationService {
	public milestoneSlides: Array<number> = [];

	getSetMilestoneSlides(slides?) {
		if (slides) {
			this.milestoneSlides = slides;
		}
		return this.milestoneSlides;
	}
}