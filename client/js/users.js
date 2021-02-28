window.addEventListener("load", function (e) {
  const getUsers = async () => {
    // fetch the users data from our API
    const userRequest = await fetch("/api/v1/users");
    const users = await userRequest.json();

    // grab the aside element
    const aside = document.querySelector(".users-aside");

    // loop through users => create a template
    users.forEach((user) => {
      const template = `
                        <div class="user-div">
                            <img src="./assets/img/profile.png" alt="user picture" />
                            <div>
                                <h3>${user.username}</h3>
                                <p>${user.email}</p>
                            </div>
                        </div>
                        `;

      const element = document
        .createRange()
        .createContextualFragment(template)
        .querySelector(".user-div");

      // add the template to the DOM
      aside.appendChild(element);
    });
  };

  getUsers();
});
