jest.mock("./twApi");

test("", () => {
    twApi.getTweets.mockResolvedValue({});
});

const myMockFunc = jest.fn();
