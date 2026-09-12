class StudioPage {
  HOME = '/studio';
  SETTINGS = `${this.HOME}/settings`;
  UPLOAD_VIDEO = `${this.HOME}/upload`;

  EDIT_VIDEO(path: string) {
    return `/edit/v/${path}`;
  }
}
export const STUDIO_PAGE = new StudioPage();