Basic setup:

2 Servers (server, 'client')

Server:
NodeJS run on docker
Express used for API endpoint decisions (CRUD)
- /api/
- /api/get-exercise/:id <-- GET
	- Returns object of
{
	id: ____
	authorId: (seen from lab demonstrator)
	level: NUM
	plasmid: { STILL UNSURE
		res: [
			{
				RESid:

			}
		]
	}
	haystack: {
		beginPosition: NUM
		endPosition: NUM
		length: NUM
	}
	context: {
		instructionsText: TEXT
		helpText: TEXT
	}
}
- /api/upload-exercise/ <-- POST via lab demonstrator's portal (OAuth or custom?)
- /api/delete-exercise/:id <-- DELETE
- /api/update-exercise/:id <-- PUT
- /api/check/:exercise-id/ <-- POST
	- This one is most important. Takes in a data object of format:
{
	id:
	studentId: (sedm4648)
	forwardHaystackMatch:
	forwardPrimerMatch:
	reverseHaystackMatch:
	reversePrimerMatch:
}
	- Then does the following:
	Matches haystack forward and back using simple String.match from beginPosition and endPosition
	returns an object of
	{
		success: BOOLEAN,

	}

Mocha for unit testing

Client:
ReactJS for component composition
Axios for data fetchiing from the Server
- One call to retrieve

Animations:
CSS3 using either
	a) Promises (most likely, with JS timers aligned with inline CSS)
	b) Callbacks
	c) Async/await
Done via @keyframes
