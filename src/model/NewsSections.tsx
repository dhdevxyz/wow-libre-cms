export interface NewsSectionsDto {
  title: string;
  sub_title: string;
  img_url: string;
  author: string;
  created_at: string;
  sections: Section[];
}

export interface Section {
  id: number;
  title: string;
  content: string;
  img_url: string;
  section_order: number;
}
