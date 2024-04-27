type Params = { params: Record<string, string> };
type RootState = ReturnType<typeof rootReducer>;
type ChangeHandler = (newValue: string) => void;

export interface LayoutProps {
    modal: React.ReactNode;
    children: React.ReactNode;
}

export interface TeacherCardProps {
    teacher: {
        id: string;
        name: string;
        surname: string;
        languages: string[];
        lesson_info: string;
        conditions: string[];
        avatar_url: string;
        lessons_done: number;
        rating: number;
        price_per_hour: number;
        authUser: boolean;
        favorites: any[];
        experience: string;
        reviews: ReviewProps[];
        levels: string[];
    }
    page?: string;
}

export interface ModalProps {
    children?: React.ReactNode;
    show: boolean;
}

export interface ReviewProps {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export interface MoreInfoProps {
    experience: string;
    reviews: ReviewProps[];
}

export interface StatisticsProps {
    options: { number: string; title: string }[];
}

export interface LoaderProps {
    title: string;
}

export interface BookModalProps {
    teacherId: string;
}

export interface BookBtnProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    teacherId: string;
    page: string;
}

export interface BookFormProps {
    languages: string[];
    teacherId: string;
}

export interface ItemState {
    language: string[];
    levels: string[];
}

export interface LevelsListProps {
    levels: string[];
}

export interface LikeBtnProps extends TeacherCardProps {
    id: string;
}

export interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export interface TopInfoProps {
    lessons_done: number;
    rating: number;
    price_per_hour: number;
}

export interface TextMaskCustomProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  [key: string]: any;
}

export interface User {}