import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

class SubscriptionController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (user.id === meetup.user_id) {
      return res
        .status(400)
        .json({ error: 'The event creator cannot register for it' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'You cannot sign up for previous meetings.' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(subscription);
  }

  async index(req, res) {
    const subscriptions = await User.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  // async delete(req, res) {

  //   subscription.destroy();

  //   return res.status(200).json({ success: 'Successfully deleted Meetup.' });
  // }
}

export default new SubscriptionController();
