// using System.Net;
// using System.Net.Http.Json;
// using api.Dtos.Account;
// using FluentAssertions;
// using integration;
// using Microsoft.Build.Framework;
// using Xunit;

// public class AccountControllerTest : IClassFixture<ApiWebApplicationFactory<Program>>
// {
//     private readonly HttpClient _client;
//     private readonly ITestOutputHelper _output;


//     public AccountControllerTest(ApiWebApplicationFactory<Program> factory,
//      ITestOutputHelper output)
//     {
//         _client = factory.CreateClient();
//         _output = output;
//     }

//     [Fact]
//     public async Task Signup_WithValidData_ReturnsOk()
//     {
//         // Arrange
//         var signupDto = new SignupDto
//         {
//             UserName = "test_user",
//             Email = "test_user@gmail.com",
//             Password = "Abc123!?",
//             FirstName = "Astra",
//             LastName = "Zeneca",
//             PhoneNumber = "09432756027"
//         };

//         // Act
//         var response = await _client.PostAsJsonAsync("/api/account/signup", signupDto, cancellationToken: TestContext.Current.CancellationToken);

//         var body = await response.Content.ReadAsStringAsync(TestContext.Current.CancellationToken);
//         _output.WriteLine("Response body:" + body);

//         // Assert
//         response.StatusCode.Should().Be(HttpStatusCode.OK);

//         var result = await response.Content.ReadFromJsonAsync<NewUserDto>(cancellationToken: TestContext.Current.CancellationToken);
//         result!.UserName.Should().Be("test_user");

//     }
// }
