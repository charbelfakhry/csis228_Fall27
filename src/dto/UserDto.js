// see ProductDto.js for why DTOs are used

class UserRequestDto{
    constructor({firstName, lastName, dob}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
    }

    static fromRequest(body){
        return new UserRequestDto(body);
    }
}

class UserResponseDto{
    constructor(user){
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.dob = user.dob;
    }

    static fromModel(user){
        return new UserResponseDto(user);
    }

    static fromModels(users){
        return users.map(UserResponseDto.fromModel);
    }
}

module.exports = {
    UserRequestDto,
    UserResponseDto
}
