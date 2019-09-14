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

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(subscription);
  }

  // async index(req, res) {
  //   return res.json(meetups);
  // }

  // async delete(req, res) {

  //   subscription.destroy();

  //   return res.status(200).json({ success: 'Successfully deleted Meetup.' });
  // }
}

export default new SubscriptionController();
