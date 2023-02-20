import React, { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import Button from "../Button";
import FormTextArea from "../FormTextArea";
import Input from "../Input";
import UserCounter from "../UserCounter";
import "./styles.css";

const requiredText = "Поле обязательно";

const validateText = (text, cb) => {
  if (!text) {
    cb(requiredText);
    return true;
  }

  if (text < 3) {
    cb("Слишком короткий текст");
    return true;
  }

  if (/\s/g.test(text)) {
    cb("Не должно быть пробелов");
    return true;
  }

  return false;
};

const validateUrl = (text, cb) => {
  if (!text) {
    cb(requiredText);
    return true;
  }
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(text)) {
    cb("Невалидная ссылка");
    return true;
  }
};

const UserBio = ({
  avatarUrl,
  nickname,
  subscribed,
  subscribers,
  firstName,
  lastName,
  description,
  url,
  isMyPage,
  isSubscribed,
  onEdit,
  fromLoading,
}) => {
  const [btnProps, setBtnProps] = useState({
    onClick: () => false,
    children: "Подписаться",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [formUserName, setFormUserName] = useState(nickname);
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formDescription, setFormDescription] = useState(description);
  const [formUrl, setFormUrl] = useState(url);
  const [userNameError, setUserNameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [urlError, setUrlError] = useState("");

  const onSaveEditForm = useCallback(async () => {
    const isUserNameError = validateText(formUserName, setUserNameError);
    const isFirstNameError = validateText(formFirstName, setFirstNameError);
    const isLastNameError = validateText(formLastName, setLastNameError);
    const isUrlError = validateUrl(formUrl, setUrlError);

    let isErrors =
      isUserNameError || isFirstNameError || isLastNameError || isUrlError;

    validateText(formUserName, setUserNameError) ||
      validateText(formFirstName, setFirstNameError) ||
      validateText(formLastName, setLastNameError) ||
      validateUrl(formUrl, setUrlError);

    if (!formDescription) {
      isErrors = true;
      setDescriptionError(requiredText);
    }

    if (isErrors) {
      return;
    }

    await onEdit({
      firstName: formFirstName,
      lastName: formLastName,
      nickname: formUserName,
      description: formDescription,
      url: formUrl,
    });
    setIsEditMode(false);
  }, [formUserName, formFirstName, formLastName, formDescription, formUrl]);

  useEffect(() => {
    if (isMyPage) {
      if (isEditMode) {
        setBtnProps({
          onClick: onSaveEditForm,
          children: "Сохранить",
          className: "cnUserEditButton",
          disabled: fromLoading,
        });
      } else {
        setBtnProps({
          onClick: () => setIsEditMode(true),
          children: "Редактировать",
        });
      }
    } else if (isSubscribed) {
      setBtnProps({ onClick: () => false, children: "Отписаться" });
    } else {
      setBtnProps({ onClick: () => false, children: "Подписаться" });
    }
  }, [isMyPage, isSubscribed, isEditMode, fromLoading, onSaveEditForm]);

  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        username: (
          <Input
            value={formUserName}
            onChange={({ target: { value } }) => setFormUserName(value)}
            errorText={userNameError}
            className="cnInput"
          />
        ),
        name: (
          <>
            <Input
              value={formFirstName}
              onChange={({ target: { value } }) => setFormFirstName(value)}
              className="cnInput"
              errorText={firstNameError}
            />
            <Input
              value={formLastName}
              onChange={({ target: { value } }) => setFormLastName(value)}
              className="cnInput"
              errorText={lastNameError}
            />
          </>
        ),
        description: (
          <FormTextArea
            value={formDescription}
            onChange={({ target: { value } }) => setFormDescription(value)}
            className="cnInput"
            errorText={descriptionError}
          />
        ),
        url: (
          <Input
            value={formUrl}
            onChange={({ target: { value } }) => setFormUrl(value)}
            className="cnInput"
            errorText={urlError}
          />
        ),
        firstButtonClassName: "cnUserBioButtonRow",
      };
    }

    return {
      username: <span className="cnUserBioNickname">{nickname}</span>,
      name: (
        <span className="cnUserBioName">
          {firstName} {lastName}{" "}
        </span>
      ),
      description: <span>{description}</span>,
      url: <a href={url}>{url}</a>,
      firstButtonClassName: "cnUserBioRow",
    };
  }, [
    isEditMode,
    nickname,
    firstName,
    lastName,
    description,
    url,
    formUserName,
    formFirstName,
    formLastName,
    formDescription,
    formUrl,
    userNameError,
    firstNameError,
    lastNameError,
    descriptionError,
    urlError,
  ]);

  return (
    <div className="cnUserBioRoot">
      <div>
        <img className="cnUserBioAvatar" src={avatarUrl} alt="avatar" />
      </div>
      <div className="cnUserBioInfo">
        <div className={fields.firstButtonClassName}>
          {fields.username}
          <Button {...btnProps} />
        </div>
        <div className="cnUserBioRow">
          <UserCounter
            count={5}
            text="Публикаций"
            className="cnUserBioCounter"
          />
          <UserCounter
            count={subscribers}
            text="Подписчиков"
            className="cnUserBioCounter"
          />
          <UserCounter count={subscribed} text="Подписок" />
        </div>
        <div className="cnUserBioRow">{fields.name}</div>
        <div className="cnUserBioRow">{fields.description}</div>
        {fields.url}
      </div>
    </div>
  );
};

export default UserBio;
