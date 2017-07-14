import { EquationsToolPage } from './app.po';

describe('equations-tool App', () => {
  let page: EquationsToolPage;

  beforeEach(() => {
    page = new EquationsToolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
