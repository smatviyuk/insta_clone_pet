
import UserBadge from "../UserBadge";
import Comment from "../Comment";
import "./styles.css";
import { useState } from "react";

const DetailedCard = ({
  userName,
  avatarUrl,
  userId,
  imgUrl,
  likes,
  comments,
  isLikedByYou,
}) => {
  const [isCommentsShown, setIsCommentsShown] = useState(false)

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShown) {
      const commentsCopy = [...comments];
      const commentForRender = commentsCopy.splice(comments.length - 2, 2);
      return (
        <>
          <span className='cnDetailedCardCommentTitle' onClick={() => setIsCommentsShown(true)}>{`Показать еще ${
            comments.length - commentForRender.length
          } комментариев`}</span>
          {commentForRender.map((comment) => <Comment {...comment} />)}
        </>
      );
    }
    return comments.map((comment) => <Comment {...comment} />);
  };
  return (
    <div className="cnDetailedCardRoot">
      <div className="cnDetailedCardHeader">
        <UserBadge nickName={userName} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        <img src={imgUrl} alt="img" className="cnDetailedCardImage" />
      </div>
      <div className="cnDetailedCardButtons">
        <i
          className={`${
            isLikedByYou ? "fas" : "far"
          } fa-heart cnDetailedCardLikeIcon`}
        />
        <i className="far fa-comment cnDetailedCardCommentIcon" />
      </div>
      <div className="cnDetailedCardCounter">{`Оценили ${likes} человек`}</div>
      <div className="cnDetailedCardComments">
        {renderComments()}
      </div>
      <textarea className="cnDetailedCardTextArea" />
    </div>
  );
};

export default DetailedCard;
