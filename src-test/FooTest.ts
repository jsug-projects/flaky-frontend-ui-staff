import {assert} from 'chai';
import {Event} from "app/dto/event/Event";


describe("foo", function(){

	it("foo", function(){
		let event = new Event();
		assert.isUndefined(event.id);
	});



});