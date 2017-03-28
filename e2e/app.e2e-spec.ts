import { Scheduler.SPAPage } from './app.po';

describe('scheduler.spa App', () => {
  let page: Scheduler.SPAPage;

  beforeEach(() => {
    page = new Scheduler.SPAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
