export interface Customer {
    id: number;
    user: {
        id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
    };
    phone: string;
    address: string;
    avatar: string | null;
    created_at: string;
    updated_at: string;
}

export interface CustomerStats {
    totalRentals: number;
    totalSpent: number;
    averageRating: number;
    reviewCount: number;
}