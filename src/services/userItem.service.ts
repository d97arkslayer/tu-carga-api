import UserItem from '@models/UserItem';

class UserItemService {
  async createUserItem(params: Partial<UserItem>): Promise<UserItem> {
    return UserItem.create(params);
  }

  async findUserItemById(id: number): Promise<UserItem | null> {
    return UserItem.findByPk(id);
  }

  async getAllUserItems(): Promise<UserItem[]> {
    return UserItem.findAll({ order: [['createdAt', 'DESC']] });
  }

  async updateUserItem(id: number, params: Partial<UserItem>): Promise<UserItem | null> {
    const item = await UserItem.findByPk(id);
    if (!item) return null;
    await item.update(params);
    return item;
  }

  async deleteUserItem(id: number): Promise<boolean> {
    const item = await UserItem.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  }

  async getUserItemsByUser(userId: number): Promise<UserItem[]> {
    return UserItem.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new UserItemService();
