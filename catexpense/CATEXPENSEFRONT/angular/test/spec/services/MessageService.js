'use strict';

describe('Services: MessageService', function () {
    var MessageService;

    beforeEach(module('expenseApp.Services'));

    beforeEach(inject(function (_MessageService_) {
        MessageService = _MessageService_;
    }));

    it('should get value of \'message\'', function () {
        expect(MessageService.getMessage()).toBe('');
    });

    it('should set value of \'message\'', function () {
        MessageService.setMessage('New Message');
        expect(MessageService.getMessage()).toBe('New Message');
    });

    it('should get value of \'broadCastMessage\'', function () {
        expect(MessageService.getBroadCastMessage()).toBe('');
    });

    it('should set value of \'broadCastMessage\'', function () {
        MessageService.setBroadCastMessage('NewBroadCastMessage');
        expect(MessageService.getBroadCastMessage()).toBe('NewBroadCastMessage');
    });

    it('should get value of \'id\'', function () {
        expect(MessageService.getId()).toBe('');
    });

    it('should set value of \'id\'', function () {
        MessageService.setId('id');
        expect(MessageService.getId()).toBe('id');
    });

    it('should get value of \'index\'', function () {
        expect(MessageService.getIndex()).toBe(0);
    });

    it('should set value of \'index\'', function () {
        MessageService.setIndex(1);
        expect(MessageService.getIndex()).toBe(1);
    });

    it('should get value of \'addComment\'', function () {
        expect(MessageService.getAddComment()).toBe(false);
    });

    it('should set value of \'addComment\'', function () {
        MessageService.setAddComment(true);
        expect(MessageService.getAddComment()).toBe(true);
    });
});