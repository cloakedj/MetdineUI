import { ContentLengthPipe } from './content-length.pipe';

describe('ContentLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new ContentLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
