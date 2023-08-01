interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
        description: string;
        status: string;
        createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        
        {
            
            description: 'Pendiente: lorem10orem10orem10orem10orem10orem10orem10',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            
            description: 'En progreso: lorem10sdgdsgsgdsgsgsgsdgsgsgsg0orem10',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            
            description: 'Finished: lorem10sdgdsgsgsgsdgsg10orem10orem10',
            status: 'finished',
            createdAt: Date.now(),
        },
    ]
}