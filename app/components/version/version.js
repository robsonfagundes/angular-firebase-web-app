'use strict';

angular.module('angularFirebaseWebApp.version', [
  'angularFirebaseWebApp.version.interpolate-filter',
  'angularFirebaseWebApp.version.version-directive'
])

.value('version', '0.1');
