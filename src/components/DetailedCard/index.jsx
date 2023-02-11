import UserBadge from "../UserBadge";
import cn from "classnames";
import Comment from "../Comment";
import "./styles.css";
import { nanoid } from "nanoid";
import { useState } from "react";

const DetailedCard = ({
  userName,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  comments,
  isLikedByYou,
  className,
  onLikeClick,
  id,
  onCommentSendClick,
  mutateLoading,
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const [comment, setComment] = useState("");

  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, comment);
      setComment('');
    }
  }

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShown) {
      const commentsCopy = [...comments];
      const commentForRender = commentsCopy.splice(comments.length - 2, 2);
      return (
        <>
          <span
            className="cnDetailedCardCommentTitle"
            onClick={() => setIsCommentsShown(true)}
          >{`Показать еще ${
            comments.length - commentForRender.length
          } комментариев`}</span>
          {commentForRender.map((comment) => (
            <Comment {...comment} key={nanoid()} />
          ))}
        </>
      );
    }
    return comments.map((comment) => <Comment {...comment} key={nanoid()} />);
  };
  return (
    <div className={cn("cnDetailedCardRoot", className)}>
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="cnDetailedCardImage" />
      </div>
      <div className="cnDetailedCardButtons">
        <i
          onClick={() => onLikeClick(id)}
          className={`${
            isLikedByYou ? "fas" : "far"
          } fa-heart cnDetailedCardLikeIcon`}
        />
        <i className="far fa-comment cnDetailedCardCommentIcon" />
      </div>
      <div className="cnDetailedCardCounter">{`Оценили ${likes} человек`}</div>
      <div className="cnDetailedCardComments">{renderComments()}</div>
      <div className="cnDetailedCardTextAreaWrapper">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Введите комментарий"
          className="cnDetailedCardTextArea"
        />
        <button
          disabled={mutateLoading}
          className="cnDetailedCardSendButton"
          onClick={handleSendCommentClick}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default DetailedCard;
