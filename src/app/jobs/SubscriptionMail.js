import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    console.log('A fila executou.');

    await Mail.sendMail({
      to: `${meetup.creator.name} <${meetup.creator.email}>`,
      subject: 'Inscrição feita',
      template: 'subscription',
      context: {
        creator: meetup.creator.name,
        title: meetup.title,
        user: user.name,
      },
    });
  }
}

export default new SubscriptionMail();
