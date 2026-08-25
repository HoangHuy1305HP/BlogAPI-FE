export function generateSlug(title:string) {
    const slug = title.normalize("NFD") // tách dấu ra khỏi chữ cái;
                      .replace(/[\u0300-\u036f]/g, "") // xóa dấu tiếng Việt
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt (giữ chữ số, khoảng trắng, dấu -)
                      .trim() // xóa khoảng trắng đầu cuối
                      .split(" ")
                      .filter((word) => word !== "")
                      .join("-")
    return slug;
}