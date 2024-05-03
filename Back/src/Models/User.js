class User {
  constructor(
    email,
    password,
    role_id,
    first_name,
    last_name,
    address,
    // token,
    gdpr,
    created_at,
    update_at
  ) {
    this.email = email;
    this.password = password;
    this.role_id = role_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    // this.token = token;
    this.gdpr = gdpr;
    this.createdAt = created_at;
    this.updateAt = update_at;
  }
}

module.exports = { User };
