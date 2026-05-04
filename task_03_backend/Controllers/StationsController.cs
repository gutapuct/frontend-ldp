using DodoKds.Api.Models;
using DodoKds.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DodoKds.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class StationsController(InMemoryStore store) : ControllerBase
{
    /// <summary>Get all kitchen stations.</summary>
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<Station>>(StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<Station>> GetAll() => Ok(store.GetStations());
}
