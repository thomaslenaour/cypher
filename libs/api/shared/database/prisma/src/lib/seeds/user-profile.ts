import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { user } from './user';

const USER_PROFILES: {
  [key: string]: { bannerUrl: string; profileUrl: string };
} = {
  plkxmr6gr000008l2d26y2plk: {
    bannerUrl:
      'https://yt3.googleusercontent.com/6CfPOVwmPYzpPhmiDJKJltuw3ymB7fkRavoZb6chUnlaOeGOVYSI4eOrh2BwNqhuD3rp56qiEA=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/ChOjl1d4fH7n8iipRsl8shOLB4-NblJQdKLAVCnxk0ed_4-eKlf97O0AJSRfZdobHUbXC1RGOw=s176-c-k-c0x00ffffff-no-rj',
  },
  traxmr6gr000008l2d26y2tra: {
    bannerUrl:
      'https://yt3.googleusercontent.com/iORDa74IB7XHOoCI1zXburyGVz5rcAZFBk20dRXigb9ot5aGkgxe3o0ri4yR0O6L8G_ygzVgmw=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/ytc/AOPolaSAOImmdAXpGL9hhYUoJ-6s6Gz9hcTBrK9q7dyYnw=s176-c-k-c0x00ffffff-no-rj',
  },
  kenxmr6gr000008l2d26y2ken: {
    bannerUrl:
      'https://yt3.googleusercontent.com/aeBwVUElX0B8t7BwGY9OpnhIxsZMEzfPmQ7dQ64CriDHcGl9eLvz_9_wZqAJYHY23UbnqpNQdg=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/V4FqOieQ9y9dnErXPUZNWl1hyLafxIK7F55n5M8LVhPBmEou8kAbNuMlUZx23DoJHvH1sWG56No=s176-c-k-c0x00ffffff-no-rj',
  },
  limxmr6gr000008l2d26y2lim: {
    bannerUrl:
      'https://yt3.googleusercontent.com/9ZjAWCd1p9ByEYmm0WTnCHg375pXaJT5auP5qoq0Zqpcx_nezfGcU4poSqJcf5OE9pzbBijf=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/ytc/AOPolaRcdCnfVZKpCdpnQTFXXTwtnAvC-146YS6_EHCzAQ=s176-c-k-c0x00ffffff-no-rj',
  },
  draxmr6gr000008l2d26y2dra: {
    bannerUrl:
      'https://yt3.googleusercontent.com/N_-lXcK6MdKwjrXQMdPbEabFwcdudvpy2p-Xmeqa-TkSGFrGRs3txwJzlx38BfF8zrNR9izN=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/ytc/AOPolaRbOTXIqj4BkxjCWHh-G6xywTnr5PZy3sA6yALA0g=s176-c-k-c0x00ffffff-no-rj',
  },
  emixmr6gr000008l2d26y2emi: {
    bannerUrl:
      'https://yt3.googleusercontent.com/kIJaaY-nLkpHFEtPoey1lDean_a6TLwBXUZm7MIzcFkQAoHDGcJ6a2hhUsD-Fa2OS4vqaOEpDLQ=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/ytc/AOPolaTb668hpGbR3JwaF2I4GZrGG5ep-9BjPGntwrwivA=s176-c-k-c0x00ffffff-no-rj',
  },
  layxmr6gr000008l2d26y2lay: {
    bannerUrl:
      'https://yt3.googleusercontent.com/ZUsAFPMm32isRhuJVHO7Fmh0EeofMkYFPh7cBMmIxKVavx_IR_0bYI5QRDXv6ea8I-fzZ4Jr=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    profileUrl:
      'https://yt3.googleusercontent.com/ytc/AOPolaR3BEKkUITrTjeiBX8goyvef5x5MH-w-4kUvUfH_A=s176-c-k-c0x00ffffff-no-rj',
  },
};

export const userProfile: Prisma.UserProfileCreateManyInput[] = user
  .filter((u) => u.id)
  .map((u) => {
    return {
      pseudo: u.name!.toLocaleLowerCase().replace(' ', '_'),
      name: u.name!,
      userId: u.id!,
      bannerUrl: USER_PROFILES[u.id!].bannerUrl,
      profileUrl: USER_PROFILES[u.id!].profileUrl,
      punchline: faker.lorem.sentence(),
    };
  });
