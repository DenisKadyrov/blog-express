curl -X PATCH http://localhost:4444/posts/662ad5888e8675921130047f \
    -H "Accept: application/json" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJhYzVkYTc1ZWZjMmIwMTRkYjQ4NDQiLCJpYXQiOjE3MTQwNzkxOTQsImV4cCI6MTcxNjY3MTE5NH0.YBriUz1AvNcnCgxNA7BERYNcpBhYIcP8sr5waFGLuAY" \
	-H "Content-Type: application/json" \
    -d '{"title": "header", "text": "some text for test rodddte"}'