export class StringUtils {
    
    public static setUserInitials(fullname: string): string | null {
        if (fullname) {
          const names = fullname.split(' ').slice(0, 2);
          return names.map(name => name[0]).join('').toUpperCase();
        }
        return null;
      }
}