import { commentReceiveRequest, commentReceiveSuccess, commentReceiveFailure } from "./CommentReceive";

describe("CommentReceive reducer", () => {
    it("should handle COMMENT_SEND_REQUEST", () => {
        const nextState = commentReceiveRequest();
        expect(nextState).toEqual({
            type: "comment/comment_receive_Request"
        })
    });

    it("should handle COMMENT_SEND_SUCCESS", () => {
        const nextState = commentReceiveSuccess();
        expect(nextState).toEqual({
            type: "comment/comment_receive_Success"
        })
    });

    it("should handle COMMENT_SEND_FAILURE", () => {
        const nextState = commentReceiveFailure();
        expect(nextState).toEqual({
            type: "comment/comment_receive_Failure"
        })
    });
});
