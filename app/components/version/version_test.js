'use strict';

describe('angularFirebaseWebApp.version module', function() {
  beforeEach(module('angularFirebaseWebApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
