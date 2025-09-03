export default class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      bio: this._bioElement.textContent.trim()
    };
  }

  setUserInfo({ name, bio }) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
  }
}