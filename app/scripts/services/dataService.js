

const dataService = function($http) {
	
	this.getCurrentUser = () => {
		return $http.get("/api/username");
	};
	
	this.getQuestions = () => {
		return $http.get("/api/questions/");
	};

	this.addQuestion = (question) => {
		return $http.post("/api/questions/", question);
	};

	this.deleteQuestion = (question) => {
		return $http.delete("/api/questions/" + question._id);
	};

	this.getQuestion = (id) => {
		return $http.get("/api/questions/" + id);
	};

	this.addAnswer = (id, answer) => {
		return $http.post("/api/questions/" + id + "/answers", answer);
	};

	this.deleteAnswer = (id, answer) => {
		return $http.delete("/api/questions/" + id + "/answers/" + answer._id);
	};
	
	this.updateAnswer = (id, answer) => {
		return $http.put("/api/questions/" + id + "/answers/" + answer._id, answer);
	};

};

export default dataService;