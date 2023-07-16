using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:Controller
    {
        private IMediator _mediaror;

        protected IMediator Mediator => _mediaror ??=
            HttpContext.RequestServices.GetService<IMediator>();
    }
}