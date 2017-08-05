

const dataService = function($http) {
	
	this.getCurrentUser = callback => $http.get('/api/username').then(callback);
	
	this.getQuestions = callback => $http.get('/api/questions').then(callback);

	this.addQuestion = (question, callback) => $http.post('/api/questions', question).then(callback);

	this.deleteQuestion = (question, callback) => $http.delete('/api/questions/' + question._id).then(callback);

	this.getQuestion = (id, callback) => $http.get('/api/questions/' + id).then(callback);

	this.addAnswer = (id, answer, callback) => $http.post('/api/questions/' + id + '/answers', answer).then(callback);

	this.deleteAnswer = (id, answer, callback) => $http.delete('/api/questions/' + id + '/answers/' + answer._id).then(callback);
	
	this.updateAnswer = (id, answer, callback) => $http.put('/api/questions/' + id + '/answers/' + answer._id, answer).then(callback);

};

export default dataService;